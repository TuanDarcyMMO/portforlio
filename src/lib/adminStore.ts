import { create } from "zustand";

interface AdminStore {
  isAdminMode: boolean;
  toggleAdminMode: () => void;
  setAdminMode: (value: boolean) => void;
}

export const useAdminMode = create<AdminStore>((set) => ({
  isAdminMode: false,
  toggleAdminMode: () => set((state) => ({ isAdminMode: !state.isAdminMode })),
  setAdminMode: (value: boolean) => set({ isAdminMode: value }),
}));
