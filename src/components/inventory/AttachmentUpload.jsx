import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { ATTACHMENT_ERROR } from '../../utils/error_messages'

const AttachmentUpload = props => {
	return (
		<Form
			noValidate
			validated={props.validated}
			onSubmit={props.handleAttachmentUpload}
		>
			<Form.Group controlId="attachments" className="mb-3">
				<Form.Text>
                        Voit lisätä max. 5 liitetiedostoa. Liitetiedostojen maksimikoko on 64 megatavua.
                        Liitetiedostot ovat tarkoitettu viistokaiutusdatalle ja valokuville.<br />
                        Jos sinulla on isoja liitetiedostoja ja enemmän aineistoa sukelluksesta, kerro siitä raportissasi!
				</Form.Text>
				<Form.Control
					type="file" multiple
					required
					data-testid="attachment"
					onChange={event => {
						// Check if there are more than 5 attachments
						if (event.target.files.length > 5) {
							event.target.value = null
							props.setAttachmentFiles(null)
							alert('Raporttiin voi lisätä enintään viisi liitetiedostoa!')
						}
						// Go through the attachment files. Discard attachment if over 64 MB
						for (let i = 0; i < event.target.files.length; i++) {
							if (event.target.files[i].size > 67108864) {
								event.target.value = null
								props.setAttachmentFiles(null)
								alert('Liitetiedoston maksimikoko on 64 megatavua!')
							}
						}
						props.setAttachmentFiles(event.target.files)
					}
					}
				/>
				<Form.Control.Feedback type="invalid">
					{ATTACHMENT_ERROR}
				</Form.Control.Feedback>
				<Button
					type="submit"
				>
                    Lisää liitetiedosto
				</Button>
			</Form.Group>
		</Form>
	)
}

export default AttachmentUpload