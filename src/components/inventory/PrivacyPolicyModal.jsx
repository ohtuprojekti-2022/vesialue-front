/* istanbul ignore file */
import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const TermsofserviceModal = ({show, close}) => {

	return (
		<div className="container">
			<Modal size="lg" show={show} onHide={close}>
				<Modal.Header closeButton>
					<Modal.Title>Tietosuojaseloste</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Mieleni minun tekevi, aivoni ajattelevi lähteäni laulamahan, saaani sanelemahan, sukuvirttä suoltamahan, lajivirttä laulamahan. Sanat suussani sulavat, puheet putoelevat, kielelleni kerkiävät, hampahilleni hajoovat.

					Veli kulta, veikkoseni, kaunis kasvinkumppalini! Lähe nyt kanssa laulamahan, saa kera sanelemahan yhtehen yhyttyämme, kahtaalta käytyämme! Harvoin yhtehen yhymme, saamme toinen toisihimme näillä raukoilla rajoilla, poloisilla Pohjan mailla.

					Lyökämme käsi kätehen, sormet sormien lomahan, lauloaksemme hyviä, parahia pannaksemme, kuulla noien kultaisien, tietä mielitehtoisien, nuorisossa nousevassa, kansassa kasuavassa: noita saamia sanoja, virsiä virittämiä vyöltä vanhan Väinämöisen, alta ahjon Ilmarisen, päästä kalvan Kaukomielen, Joukahaisen jousen tiestä, Pohjan peltojen periltä, Kalevalan kankahilta.

					Niit ennen isoni lauloi kirvesvartta vuollessansa; niitä äitini opetti väätessänsä värttinätä, minun lasna lattialla eessä polven pyöriessä, maitopartana pahaisna, piimäsuuna pikkaraisna. Sampo ei puuttunut sanoja eikä Louhi luottehia: vanheni sanoihin sampo, katoi Louhi luottehisin, virsihin Vipunen kuoli, Lemminkäinen leikkilöihin.

					Viel on muitaki sanoja, ongelmoita oppimia: tieohesta tempomia, kanervoista katkomia, risukoista riipomia, vesoista vetelemiä, päästä heinän hieromia, raitiolta ratkomia, paimenessa käyessäni, lasna karjanlaitumilla, metisillä mättähillä, kultaisilla kunnahilla, mustan Muurikin jälessä, Kimmon kirjavan keralla.

					Vilu mulle virttä virkkoi, sae saatteli runoja. Virttä toista tuulet toivat, meren aaltoset ajoivat. Linnut liitteli sanoja, puien latvat lausehia.
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

export default TermsofserviceModal
