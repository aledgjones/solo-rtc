import { useEffect } from 'react';

export function useStyle(...args: string[]) {

    useEffect(() => {
        const style = document.createElement("style");
        style.appendChild(document.createTextNode(""));
        document.head.appendChild(style);

        const sheet: any = style.sheet;
        args.forEach(css => {
            sheet.insertRule(css);
        });

        return () => {
            style.remove();
        }
    }, [args]);

}