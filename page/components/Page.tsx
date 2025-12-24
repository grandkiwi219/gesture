import './Page.css' with { type: 'css' };

export default function({ children }: Props): React.ReactNode {
    return (
        <>
            <div id="page">
                <div className="paper">
                    {children}
                </div>
            </div>
        </>
    );
}
