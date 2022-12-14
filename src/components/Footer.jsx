import React from 'react'

/**
 * Renders a footer for the site containing information about the application
 */
const Footer = () => {
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
							<a href="mailto:mas@mas.fi?subject=Viesti%20verkkosivulta" target="_blank" rel="noopener noreferrer">
								mas@mas.fi
							</a>
						</p>
					</div>

					<hr className="clearfix w-100 d-md-none pb-0" />

					<div className="col-md-3 mb-md-0 mb-3">
						<h5 className="text-uppercase">Linkkejä</h5>
						<ul className="list-unstyled">
							<li>
								<a href="https://mas.fi/" target="_blank" rel="noopener noreferrer">mas.fi</a>
							</li>
							<li>
								<a href="https://mas.fi/yhteystiedot"target="_blank" rel="noopener noreferrer">Yhteystiedot</a>
							</li>
							<li>
								<a href="https://mas.mikrojebe.fi/" target="_blank" rel="noopener noreferrer">MAS-portaali</a>
							</li>
						</ul>
					</div>

					<div className="col-md-3 mb-md-0 mb-3">
						<h5 className="text-uppercase"></h5>
						<ul className="list-unstyled">
							<li>
								<a className="text-primary" data-testid="pp" href="https://www.mas.fi/fi/tietosuojaseloste" target="_blank" rel="noopener noreferrer">
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
				<a href="https://www.helsinki.fi/" target="_blank" rel="noopener noreferrer">Helsingin Yliopisto</a>
			</div>
		</footer>
	)
}

export default Footer
