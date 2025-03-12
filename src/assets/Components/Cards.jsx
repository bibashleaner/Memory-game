import '../Styles/Card.css'

export const Cards = ({card, onClick}) =>{
    return (
        <div className="card" onClick={onClick}>
            <img src={card.image} alt={card.name} />
            <p>{card.name}</p>
        </div>
    );
}