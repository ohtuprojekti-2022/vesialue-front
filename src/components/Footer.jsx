import React from 'react'

const Footer = ({ setShowTOS, setShowPP }) => {
	return (
		<footer
			className="page-footer font-small blue pt-4"
			style={{ background: '#eee', marginTop: 'auto' }}
		>
			<div className="container-fluid text-center text-md-left">
				<div className="row">
					<div className="col-md-6 mt-md-0 mt-3">
						<h5 className="text-uppercase">Suomen Meriarkeologinen Seura ry</h5>
						<p>Finlands Marinarkeologiska Sällskap rf</p>
						<p>
							Sähköposti:{' '}
							<a href="mailto:mas@mas.fi?subject=Viesti%20verkkosivulta">
								mas@mas.fi
							</a>
						</p>
					</div>

					<hr className="clearfix w-100 d-md-none pb-0" />

					<div className="col-md-3 mb-md-0 mb-3">
						<h5 className="text-uppercase">Linkkejä</h5>
						<ul className="list-unstyled">
							<li>
								<a href="https://mas.fi/">mas.fi</a>
							</li>
							<li>
								<a href="https://mas.fi/yhteystiedot">Yhteystiedot</a>
							</li>
							<li>
								<a href="https://mas.mikrojebe.fi/">MAS-portaali</a>
							</li>
						</ul>
					</div>

					<div className="col-md-3 mb-md-0 mb-3">
						<h5 className="text-uppercase"></h5>
						<ul className="list-unstyled">
							<li>
								<a href="#!" onClick={() => setShowTOS(true)} data-testid="tos">
									Käyttöehdot
								</a>
							</li>
							<li>
								<a href="#!" onClick={() => setShowPP(true)} data-testid="pp">
									Tietosuojaseloste
								</a>
							</li>
							<li>
								<img
									src="/logo192.png"
									style={{ width: '4rem', height: '4rem', marginTop: '1rem' }}
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="footer-copyright text-center py-3">
				Tämä verkkosovellus on lisensoitu MIT-lisenssillä © 2022 Copyright:{' '}
				<a href="https://www.helsinki.fi/">Helsingin Yliopisto</a>
			</div>
		</footer>
	)
}

export default Footer
