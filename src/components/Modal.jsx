"use client";

import AiSocGetModal from "@/components/AiSocGetModal";

// Keep the policy pages' existing modal wiring while sharing the login chooser
// used by the main website header.
const Modal = ({ isOpen, onClose }) => (
  <AiSocGetModal isOpen={isOpen} onClose={onClose} />
);

export default Modal;
