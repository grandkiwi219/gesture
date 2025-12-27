import './CSS/DisplayContainer.css' with { type: 'css' };

export default function({ children }: Props) {
    return (
        <div className="container">
            <div className="display-container">
                {children[0]}
            </div>

            <div className="options-container">
                {children[1]}
            </div>

            {children.slice(2)}
        </div>
    );
}
