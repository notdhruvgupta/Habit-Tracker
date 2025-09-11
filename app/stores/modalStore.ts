import { create } from "zustand";

interface ModalBlurInterface {
    modalBlur: boolean;
    flipModalBlur: () => void;
}

const useModalBlur = create<ModalBlurInterface>((set) => ({
    modalBlur: false,
    flipModalBlur: () => 
        set((state) => ({
        modalBlur: !state.modalBlur,       
    })),
}));

export default useModalBlur;