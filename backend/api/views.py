import json
import hashlib
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .database import SessionLocal
from .models import User, Profile

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def get_profile_dict(profile: Profile, username: str):
    try:
        unlocked = json.loads(profile.unlocked_items) if profile.unlocked_items else []
    except Exception:
        unlocked = []
    return {
        "username": username,
        "nickname": profile.nickname or "Friend",
        "avatar": profile.avatar or "Puppy",
        "stars": profile.stars or 0,
        "quizCount": profile.quiz_count or 0,
        "streak": profile.streak or 1,
        "lastLoginDate": profile.last_login_date or "",
        "challengeCompletedDate": profile.challenge_completed_date or "",
        "unlockedItems": unlocked
    }

@csrf_exempt
@require_http_methods(["POST"])
def register_view(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        username = data.get("username", "").strip()
        password = data.get("password", "").strip()
        nickname = data.get("nickname", "").strip() or username or "Friend"
        avatar = data.get("avatar", "").strip() or "Puppy"

        if not username or not password:
            return JsonResponse({"error": "Username and password are required"}, status=400)

        db = SessionLocal()
        try:
            existing = db.query(User).filter(User.username == username).first()
            if existing:
                return JsonResponse({"error": "Username already exists"}, status=400)

            user = User(
                username=username,
                password_hash=hash_password(password)
            )
            db.add(user)
            db.commit()
            db.refresh(user)

            profile = Profile(
                user_id=user.id,
                nickname=nickname,
                avatar=avatar,
                stars=0,
                quiz_count=0,
                streak=1
            )
            db.add(profile)
            db.commit()
            db.refresh(profile)

            request.session["user_id"] = user.id
            request.session["username"] = user.username

            return JsonResponse({
                "message": "Registration successful",
                "profile": get_profile_dict(profile, user.username)
            })
        finally:
            db.close()
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        username = data.get("username", "").strip()
        password = data.get("password", "").strip()

        if not username or not password:
            return JsonResponse({"error": "Username and password are required"}, status=400)

        db = SessionLocal()
        try:
            user = db.query(User).filter(User.username == username).first()
            if not user or user.password_hash != hash_password(password):
                return JsonResponse({"error": "Invalid username or password"}, status=401)

            profile = user.profile
            if not profile:
                profile = Profile(user_id=user.id, nickname=username, avatar="Puppy")
                db.add(profile)
                db.commit()
                db.refresh(profile)

            request.session["user_id"] = user.id
            request.session["username"] = user.username

            return JsonResponse({
                "message": "Login successful",
                "profile": get_profile_dict(profile, user.username)
            })
        finally:
            db.close()
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def logout_view(request):
    request.session.flush()
    return JsonResponse({"message": "Logout successful"})

@csrf_exempt
@require_http_methods(["GET"])
def profile_view(request):
    user_id = request.session.get("user_id")
    if not user_id:
        return JsonResponse({"authenticated": False}, status=401)

    db = SessionLocal()
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user or not user.profile:
            return JsonResponse({"authenticated": False}, status=401)

        return JsonResponse({
            "authenticated": True,
            "profile": get_profile_dict(user.profile, user.username)
        })
    finally:
        db.close()

@csrf_exempt
@require_http_methods(["POST"])
def update_profile_view(request):
    user_id = request.session.get("user_id")
    db = SessionLocal()
    try:
        data = json.loads(request.body.decode('utf-8'))
        
        # If user_id in session, update DB
        if user_id:
            user = db.query(User).filter(User.id == user_id).first()
            if user and user.profile:
                p = user.profile
                if "nickname" in data: p.nickname = data["nickname"]
                if "avatar" in data: p.avatar = data["avatar"]
                if "stars" in data: p.stars = data["stars"]
                if "quizCount" in data: p.quiz_count = data["quizCount"]
                if "streak" in data: p.streak = data["streak"]
                if "lastLoginDate" in data: p.last_login_date = data["lastLoginDate"]
                if "unlockedItems" in data: p.unlocked_items = json.dumps(data["unlockedItems"])
                
                db.commit()
                db.refresh(p)
                return JsonResponse({"message": "Profile updated", "profile": get_profile_dict(p, user.username)})

        return JsonResponse({"message": "Saved locally", "profile": data})
    finally:
        db.close()

@csrf_exempt
@require_http_methods(["POST"])
def claim_reward_view(request):
    user_id = request.session.get("user_id")
    data = json.loads(request.body.decode('utf-8') or '{}')
    reward_stars = data.get("reward", 5)
    today_str = data.get("date", "")

    db = SessionLocal()
    try:
        if user_id:
            user = db.query(User).filter(User.id == user_id).first()
            if user and user.profile:
                p = user.profile
                p.stars = (p.stars or 0) + reward_stars
                if today_str:
                    p.challenge_completed_date = today_str
                db.commit()
                db.refresh(p)
                return JsonResponse({
                    "message": "Reward claimed successfully!",
                    "stars": p.stars,
                    "profile": get_profile_dict(p, user.username)
                })

        return JsonResponse({"message": "Reward claimed locally", "reward": reward_stars})
    finally:
        db.close()
