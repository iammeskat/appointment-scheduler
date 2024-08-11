
import GR from 'components/hoc/GuestRoute';
import PR from 'components/hoc/ProtectedRoute';
import Layout from 'components/Layout';
import AppointmentContainer from 'containers/AppointmentContainer';
import AuthContainer from 'containers/AuthContainer';
import PeopleContainer from 'containers/PeopleContainer';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const App = () => {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route
						index
						element={<PR comp={<AppointmentContainer />} />}
					/>
					<Route
						path="/appointments"
						element={<PR comp={<AppointmentContainer />} />}
					/>
					<Route
						path="/peoples"
						element={<PR comp={<PeopleContainer />} />}
					/>
					<Route path="/login" element={<GR comp={<AuthContainer />} />} />
				</Routes>
			</Layout>
		</Router>
	)
}



export default App
