import InputText from 'components/core/InputText';
import { auth } from 'config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Loader2, LogIn } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shadcn/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'shadcn/ui/card';
import { getEventNameValue } from 'utils/helpers';



const Login = ({
	switchToSignup = () => { }
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({});
	const navigate = useNavigate();

	const handleOnChange = (event) => {
		const { name, value } = getEventNameValue(event);
		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}))
	}

	const handleOnSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		signInWithEmailAndPassword(auth, formData.email, formData.password)
			.then(userCredential => {
				// Login successful
				navigate('/');
				setIsLoading(false);
			})
			.catch(error => {
				// Handle errors
				setIsLoading(false);
			});
	};

	return (
		<form onSubmit={handleOnSubmit}>
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">Login</CardTitle>
					<CardDescription className="font-medium">Enter your email below to login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<InputText
							label="Email"
							placeholder="Enter email"
							name="email"
							value={formData.email}
							onChange={handleOnChange}
							type="email"
							required
						/>
						<InputText
							label="Password"
							placeholder="Enter password"
							name="password"
							value={formData.password}
							onChange={handleOnChange}
							type="password"
							required
						/>
						{/* <div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<Link href="#" className="ml-auto inline-block text-sm underline" prefetch={false}>
									Forgot your password?
								</Link>
							</div>
							<Input id="password" type="password" required />
						</div> */}
						<Button
							type="submit"
							className="w-full"
							disabled={isLoading}
						>
							{isLoading ? (
								<Loader2 className="size-4 mr-1 animate-spin" />
							) : (
								<LogIn className="size-4 mr-1" />
							)}
							<span>
								Login
							</span>
						</Button>
					</div>
					<div className="mt-4 text-center text-sm font-medium text-slate-600">
						Don&apos;t have an account?{" "}
						<button
							onClick={switchToSignup}
							className='text-slate-900 cursor-pointer hover:underline'
						>
							Sign up
						</button>
					</div>
				</CardContent>
			</Card>
		</form >
	);
}



export default Login
