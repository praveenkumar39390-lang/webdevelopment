function MatchCard({ match, selected, onSelect }) {
  return (
    <article className={`match-card${selected ? ' selected' : ''}`}>
      <p className="match-number">Match {String(match.id).padStart(2, '0')}</p>
      <h3>{match.shortNames}</h3>
      <p className="team-names">
        {match.teamA} <span>vs</span> {match.teamB}
      </p>
      <p>{match.date}</p>
      <p>{match.venue}</p>
      <p className="price">
        From {new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(Math.min(...Object.values(match.prices)))}
      </p>
      <button type="button" onClick={onSelect} aria-pressed={selected}>
        {selected ? 'Selected' : 'Select match'}
      </button>
    </article>
  )
}

export default MatchCard
