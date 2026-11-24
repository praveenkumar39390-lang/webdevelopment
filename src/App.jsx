import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import MatchCard from './components/MatchCard.jsx'
import './App.css'

const matches = [
  {
    id: 1,
    teamA: 'Chennai Super Kings',
    teamB: 'Mumbai Indians',
    shortNames: 'CSK vs MI',
    date: '28 March 2026 · 7:30 PM',
    venue: 'Chennai',
    prices: { General: 800, Premium: 2000, VIP: 5000 },
  },
  {
    id: 2,
    teamA: 'Royal Challengers Bengaluru',
    teamB: 'Kolkata Knight Riders',
    shortNames: 'RCB vs KKR',
    date: '29 March 2026 · 7:30 PM',
    venue: 'Bengaluru',
    prices: { General: 900, Premium: 2200, VIP: 5500 },
  },
  {
    id: 3,
    teamA: 'Rajasthan Royals',
    teamB: 'Sunrisers Hyderabad',
    shortNames: 'RR vs SRH',
    date: '30 March 2026 · 7:30 PM',
    venue: 'Jaipur',
    prices: { General: 700, Premium: 1800, VIP: 4500 },
  },
]

const formatPrice = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)

function App() {
  const [selectedMatchId, setSelectedMatchId] = useState(matches[0].id)
  const [selectedStand, setSelectedStand] = useState('General')
  const [quantity, setQuantity] = useState(1)
  const [teamFilter, setTeamFilter] = useState('All teams')

  const selectedMatch = matches.find((match) => match.id === selectedMatchId)
  const visibleMatches =
    teamFilter === 'All teams'
      ? matches
      : matches.filter((match) =>
          [match.teamA, match.teamB].includes(teamFilter),
        )
  const ticketPrice = selectedMatch.prices[selectedStand]

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <section className="matches-section" id="matches">
          <div className="section-heading">
            <p className="eyebrow">Choose your matchday</p>
            <h2>Match Schedule</h2>
          </div>

          <label className="team-filter" htmlFor="team-filter">
            Filter by team
            <select
              id="team-filter"
              value={teamFilter}
              onChange={(event) => setTeamFilter(event.target.value)}
            >
              <option>All teams</option>
              {[...new Set(matches.flatMap((match) => [match.teamA, match.teamB]))].map(
                (team) => (
                  <option key={team}>{team}</option>
                ),
              )}
            </select>
          </label>

          <div className="match-grid">
            {visibleMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                selected={match.id === selectedMatchId}
                onSelect={() => setSelectedMatchId(match.id)}
              />
            ))}
          </div>
        </section>

        <section className="booking-section" id="booking">
          <div className="booking-form">
            <p className="eyebrow">Your seat is waiting</p>
            <h2>Book Your Ticket</h2>
            <label htmlFor="stand">Stand category</label>
            <select
              id="stand"
              value={selectedStand}
              onChange={(event) => setSelectedStand(event.target.value)}
            >
              {Object.keys(selectedMatch.prices).map((stand) => (
                <option key={stand}>{stand}</option>
              ))}
            </select>

            <label htmlFor="quantity">Number of tickets</label>
            <input
              id="quantity"
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(event) =>
                setQuantity(Math.min(10, Math.max(1, Number(event.target.value) || 1)))
              }
            />
          </div>

          <aside className="booking-summary" aria-live="polite">
            <p className="eyebrow">Booking summary</p>
            <h3>{selectedMatch.shortNames}</h3>
            <p>{selectedMatch.date}</p>
            <p>{selectedMatch.venue}</p>
            <dl>
              <div>
                <dt>Stand</dt>
                <dd>{selectedStand}</dd>
              </div>
              <div>
                <dt>Ticket price</dt>
                <dd>{formatPrice(ticketPrice)}</dd>
              </div>
              <div>
                <dt>Quantity</dt>
                <dd>{quantity}</dd>
              </div>
            </dl>
            <p className="total">
              <span>Total</span>
              <strong>{formatPrice(ticketPrice * quantity)}</strong>
            </p>
          </aside>
        </section>
      </main>
      <footer>© 2026 Matchday. Made for cricket fans.</footer>
    </>
  )
}

export default App
