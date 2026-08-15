// YellowPaws Unified Storage & Django Backend API Manager
const API_BASE_URL = "http://localhost:8000/api";

const YellowPawsStorage = {
    getProfile() {
        const local = localStorage.getItem("yellowPawsProfile");
        return local ? JSON.parse(local) : null;
    },

    setLocalProfile(profile) {
        localStorage.setItem("yellowPawsProfile", JSON.stringify(profile));
    },

    async register(username, password, nickname, avatar) {
        const payload = { username, password, nickname, avatar };
        try {
            const res = await fetch(`${API_BASE_URL}/register/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }
            this.setLocalProfile(data.profile);
            return data;
        } catch (err) {
            console.warn("Backend unavailable, registering locally:", err.message);
            const profile = {
                username,
                nickname: nickname || username,
                avatar: avatar || "Puppy",
                stars: 0,
                quizCount: 0,
                streak: 1
            };
            this.setLocalProfile(profile);
            return { profile, message: "Registered locally" };
        }
    },

    async login(username, password) {
        const payload = { username, password };
        try {
            const res = await fetch(`${API_BASE_URL}/login/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }
            this.setLocalProfile(data.profile);
            return data;
        } catch (err) {
            console.warn("Backend unavailable, logging in locally:", err.message);
            const local = this.getProfile();
            if (local && (local.username === username || local.nickname === username)) {
                return { profile: local, message: "Logged in locally" };
            }
            throw err;
        }
    },

    async logout() {
        try {
            await fetch(`${API_BASE_URL}/logout/`, { method: "POST" });
        } catch (e) {
            console.warn("Backend logout request skipped:", e.message);
        }
        localStorage.removeItem("yellowPawsProfile");
    },

    async updateProfile(updates) {
        let current = this.getProfile() || { stars: 0, quizCount: 0, streak: 1, nickname: "Friend", avatar: "Puppy" };
        const updated = { ...current, ...updates };
        this.setLocalProfile(updated);

        try {
            await fetch(`${API_BASE_URL}/profile/update/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updated)
            });
        } catch (err) {
            console.warn("Backend profile sync pending offline update:", err.message);
        }
        return updated;
    },

    async claimReward(rewardStars, dateStr) {
        let profile = this.getProfile() || { stars: 0 };
        profile.stars = (profile.stars || 0) + rewardStars;
        this.setLocalProfile(profile);
        localStorage.setItem("challengeCompleted", "true");
        localStorage.setItem("challengeDate", dateStr || new Date().toDateString());

        try {
            const res = await fetch(`${API_BASE_URL}/claim-reward/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reward: rewardStars, date: dateStr })
            });
            const data = await res.json();
            if (data.profile) {
                this.setLocalProfile(data.profile);
            }
        } catch (err) {
            console.warn("Backend reward claim synced locally:", err.message);
        }
        return profile;
    }
};

window.YellowPawsStorage = YellowPawsStorage;
