import { create } from 'zustand';

export interface UiState {
  isSidebarOpen: boolean;
}

export const useUiState = create<UiState>(() => ({
  isSidebarOpen: false,
}));

const { setState } = useUiState;

export function setSidebarOpen(isOpen: boolean) {
  setState({ isSidebarOpen: isOpen });
}
