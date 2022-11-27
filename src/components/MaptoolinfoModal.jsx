/* istanbul ignore file */
import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const MaptoolinfoModal = ({ show, close }) => {
	return (
		<div className="container" data-testid="maptoolinfo-modal">
			<Modal size="lg" show={show} onHide={close} style={{ zIndex: 2001 }}>
				<Modal.Header closeButton>
					<Modal.Title>Käyttöohje</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Hiirtä siirtäessä ylimmän vaihtoehdon päälle voidaan valita millaista karttaa käytetään tai halutaanko merimerkit näkyviin.
					<div style={{display: 'flex', paddingLeft: '11%', paddingRight: '27%', paddingBottom:'2rem'}}>
						<img src='mti-menu.png' style={{border: '1px solid #000000', margin:'auto', maxWidth: '30%'}}></img>
						<div style={{paddingLeft:'4%'}}>
							<img src='mti-maps.png' style={{border: '1px solid #000000', margin:'auto', maxWidth: '100%'}}></img>
						</div>
					</div>
					Viisikulmio-painike sallii uuden alueen piirtämisen kartalle.
					Kartalle voi piirtää monimutkaisiakin alueita.
					Alue on valmis, kun alku- ja loppupiste yhdistetään tai painetaan <q>Finish</q>-painiketta, 
					jolloin se automaattisesti yhdistää alku- ja loppupisteen.
					<div style={{display: 'flex', paddingBottom:'2rem'}}>
						<img src='mti-create.png' style={{border: '1px solid #000000', margin:'auto', maxWidth: '100%'}}></img>
					</div>
					Piirrustus-painike sallii alueiden muokkauksen.
					Alueita muokataan vetämällä neliöistä.
					Muokkauksen tallennus onnistuu painamalla <q>Save</q>-painiketta			
					<div style={{display: 'flex', paddingBottom:'2rem'}}>
						<img src='mti-edit.png' style={{border: '1px solid #000000', margin:'auto', maxWidth: '100%'}}></img>
					</div>
					Alueiden poistaminen onnistuu roskakori-painikkeen avulla.
					Alueita voi joko poistaa yksittäisinä valitsemalla niitä kartalta.
					Tallentaminen onnistuu painamalla <q>Save</q>-painiketta.
					<q>Clear All</q>-painike poistaa kaikki piirretyt alueet suoraan, eikä tallennusta tarvitse tehdä.
					<div style={{display: 'flex'}}>
						<img src='mti-remove.png' style={{border: '1px solid #000000', margin:'auto', maxWidth: '100%'}}></img>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={close}>
						Sulje
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default MaptoolinfoModal
