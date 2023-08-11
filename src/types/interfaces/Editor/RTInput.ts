export interface RTInputStore {
    id: string;
    value: string;
}

export interface RTInputProps {
    item: RTInputStore;
    isFocused: boolean;
}
