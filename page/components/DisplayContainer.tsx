import { useEffect, useRef } from 'react';

import './CSS/DisplayContainer.css' with { type: 'css' };

import utils from 'page/utils/utils';


export default function({ children }: Props) {

    const display_container = useRef<HTMLDivElement>(null);
    const options_container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resize = () => {
            if (!options_container.current || !display_container.current) return;

            const top = utils.getPosY(options_container.current);
            const dis_con = display_container.current.style;

            if (top > 0) {
                if (dis_con.position == 'sticky') {
                    dis_con.position = '';
                    dis_con.top = '0';
                }
            }
            else {
                if (dis_con.position != 'sticky') {
                    dis_con.position = 'sticky';
                    dis_con.top = 'calc(var(--header-height) + 10px)';
                }
            }
        }

        resize();
        window.addEventListener('resize', resize);
    }, []);

    return (
        <div className="container">
            <div ref={display_container} className="display-container">
                {children[0]}
            </div>

            <div ref={options_container} className="options-container">
                {children[1]}
            </div>
        </div>
    );
}
