import React, { useEffect } from 'react';

type Props = {
    children?: React.ReactNode;
};

const ScreenProtection: React.FC<Props> = ({ children }) => {


    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "PrintScreen") navigator.clipboard.writeText("");
            if ((e.ctrlKey || e.metaKey) && ['u', 's', 'i', 'p'].includes(e.key.toLowerCase())) e.preventDefault();
        };
        const handleSelectStart = (e: Event) => e.preventDefault();

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("selectstart", handleSelectStart);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("selectstart", handleSelectStart);
        };
    }, []);


    return (
        <>
            {children}
        </>
    );
};

export default ScreenProtection;
