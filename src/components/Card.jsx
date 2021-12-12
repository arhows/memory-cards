import './Card.css';

export default function Card({ src, clicked, matched, clickEvent }) {
  return (
    <div
      disable={matched ? 'disable' : ''}
      onClick={clickEvent}
      className={`card ${!clicked ? 'hide' : ''}`}
    >
      <img src={src} alt="" />
    </div>
  );
}
