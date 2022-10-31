import React from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'

const InventoryForm = props => {
	const handleMethodChange = e => props.setMethod(e.target.value)

	return (
		<Form
			noValidate
			validated={props.validated}
			onSubmit={props.handleSubmit}
			data-testid="inventory-form"
		>
			<FloatingLabel controlId="coordinates" className="mb-3">
				<Form.Control
					data-testid="coordinates"
					type="text"
					defaultValue={props.mapLayers}
					hidden
					required
				/>
				<Form.Control.Feedback type="invalid">
					Anna inventointialue!
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel
				controlId="inventorydate"
				label="Inventoinnin päivämäärä"
				className="mb-3"
			>
				<Form.Control
					data-testid="inventorydate"
					type="date"
					onChange={e => props.setInventorydate(e.target.value)}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Anna sukelluksen ajankohta!
				</Form.Control.Feedback>
			</FloatingLabel>
			<div key="method" className="mb-3">
				<Form.Check
					data-testid="sight"
					inline
					label="Näköhavainto"
					name="method"
					type="radio"
					id="sight"
					onChange={handleMethodChange}
					value="sight"
					required
				/>
				<Form.Check
					data-testid="echo"
					inline
					label="Viistokaiutus"
					name="method"
					type="radio"
					id="echo"
					onChange={handleMethodChange}
					value="echo"
					required
				/>
				<Form.Check
					data-testid="dive"
					inline
					label="Sukellus"
					name="method"
					type="radio"
					id="dive"
					onChange={handleMethodChange}
					value="dive"
					required
				/>
				<Form.Check
					data-testid="other"
					inline
					label="Muu, mikä?"
					name="method"
					type="radio"
					id="other"
					onChange={handleMethodChange}
					value="other"
					required
				/>
			</div>
			{(props.method === 'sight' || props.method === 'dive') && (
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Näkyvyys vedessä</Form.Label>
					<Form.Select
						data-testid="visibility"
						onChange={e => props.setVisibility(e.target.value)}
						aria-label="Default select example"
					>
						<option value="bad">huono (alle 2m)</option>
						<option value="normal">normaali (2-5m)</option>
						<option value="good">hyvä (yli 5m)</option>
					</Form.Select>
				</Form.Group>
			)}
			{props.method === 'other' && (
				<FloatingLabel
					controlId="methodInfo"
					label="Muu, mikä?"
					className="mb-3"
				>
					<Form.Control
						data-testid="methodInfo"
						type="text"
						maxLength="100"
						onChange={e => props.setMethodInfo(e.target.value)}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Anna inventointimenetelmän tiedot!
					</Form.Control.Feedback>
				</FloatingLabel>
			)}
			<Form.Group controlId="attachments" className="mb-3">
				<Form.Check
					data-testid="attachments"
					type="checkbox"
					label="Minulla on liitetiedosto(ja)"
					onClick={() => props.setAttachments(!props.attachments)}
				/>
			</Form.Group>
			<FloatingLabel controlId="moreInfo" label="Muuta tietoa" className="mb-3">
				<Form.Control
					data-testid="moreInfo"
					type="text"
					maxLength="500"
					onChange={e => props.setMoreInfo(e.target.value)}
				/>
				<Form.Control.Feedback type="invalid">
					Lisätietojen maksimipituus on 500 merkkiä.
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="name" label="Nimi" className="mb-3">
				{( localStorage.getItem('userDetails')) && (
					<Form.Control
						data-testid="name"
						type="text"
						defaultValue={JSON.parse(localStorage.getItem('userDetails')).user.name}
						disabled
					/>
				)||
				<Form.Control
					data-testid="name"
					type="text"
					onChange={e => props.setName(e.target.value)}
				/>
				}
			</FloatingLabel>
			<FloatingLabel controlId="email" label="Sähköposti" className="mb-3">
				{( localStorage.getItem('userDetails')) && (
					<Form.Control
						data-testid="email"
						type="text"
						defaultValue={JSON.parse(localStorage.getItem('userDetails')).user.email}
						disabled
					/>
				)||
				<Form.Control
					data-testid="email"
					type="email"
					onChange={e => props.setEmail(e.target.value)}
					required
				/>
				}
				<Form.Control.Feedback type="invalid">
					Anna sähköposti!
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel
				controlId="phonenumber"
				label="Puhelinnumero"
				className="mb-3"
			>
				{( localStorage.getItem('userDetails')) && (
					<Form.Control
						data-testid="phone"
						type="text"
						defaultValue={JSON.parse(localStorage.getItem('userDetails')).user.phone}
						disabled
					/>
				)||
				<Form.Control
					data-testid="phone"
					type="phone"
					onChange={e => props.setPhone(e.target.value)}
				/>
				}
			</FloatingLabel>
			<Button variant="primary" type="submit" data-testid="submit">
				Lähetä
			</Button>
		</Form>
	)
}

export default InventoryForm
