import { Store } from "@tanstack/store";
import { appConfig } from "~/config/app";

export interface UIState {
	theme: "light" | "dark";
	sidebarCollapsed: boolean;
	isMobile: boolean;
	loading: boolean;
	notifications: Notification[];
}

export interface Notification {
	id: string;
	type: "success" | "error" | "warning" | "info";
	title: string;
	message: string;
	duration?: number;
	timestamp: Date;
}

export const uiStore = new Store<UIState>({
	theme: appConfig.theme.defaultMode, // ✅ SSR-safe
	sidebarCollapsed: false, // ✅ SSR-safe
	isMobile: false, // ✅ Default = Desktop
	loading: false,
	notifications: [],
});

// UI actions
export const uiActions = {
	hydrateFromClient: () => {
		if (typeof window !== "undefined") {
			const theme =
				(localStorage.getItem(appConfig.theme.storageKey) as
					| "light"
					| "dark") || appConfig.theme.defaultMode;
			const sidebarCollapsed = JSON.parse(
				localStorage.getItem("sidebarCollapsed") || "false"
			);
			const isMobile = window.innerWidth < 768;

			uiStore.setState((state) => ({
				...state,
				theme,
				sidebarCollapsed,
				isMobile,
			}));
		}
	},
	setTheme: (theme: "light" | "dark") => {
		localStorage.setItem(appConfig.theme.storageKey, theme);
		uiStore.setState((state) => ({
			...state,
			theme,
		}));
	},

	toggleTheme: () => {
		const currentTheme = uiStore.state.theme;
		const newTheme = currentTheme === "light" ? "dark" : "light";
		uiActions.setTheme(newTheme);
	},

	setSidebarCollapsed: (collapsed: boolean) => {
		localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
		uiStore.setState((state) => ({
			...state,
			sidebarCollapsed: collapsed,
		}));
	},

	toggleSidebar: () => {
		const newCollapsed = !uiStore.state.sidebarCollapsed;
		uiActions.setSidebarCollapsed(newCollapsed);
	},

	setMobile: (isMobile: boolean) => {
		uiStore.setState((state) => ({
			...state,
			isMobile,
		}));
	},

	setLoading: (loading: boolean) => {
		uiStore.setState((state) => ({
			...state,
			loading,
		}));
	},

	addNotification: (notification: Omit<Notification, "id" | "timestamp">) => {
		const newNotification: Notification = {
			...notification,
			id: Date.now().toString(),
			timestamp: new Date(),
		};

		uiStore.setState((state) => ({
			...state,
			notifications: [...state.notifications, newNotification],
		}));

		// Auto-remove notification after duration
		const duration = notification.duration || 5000;
		setTimeout(() => {
			uiActions.removeNotification(newNotification.id);
		}, duration);
	},

	removeNotification: (id: string) => {
		uiStore.setState((state) => ({
			...state,
			notifications: state.notifications.filter((n) => n.id !== id),
		}));
	},

	clearNotifications: () => {
		uiStore.setState((state) => ({
			...state,
			notifications: [],
		}));
	},
};

