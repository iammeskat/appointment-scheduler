
import InputText from 'components/core/InputText';
import { auth } from 'config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import useCreatePeople from 'hooks/people/useCreatePeople';
import { Loader2, LogIn } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from 'shadcn/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from 'shadcn/ui/card';
import { getEventNameValue } from 'utils/helpers';

const Signup = ({
	switchToLogin = () => { }
}) => {
	const [formData, setFormData] = useState({});
	const [error, setError] = useState('');
	const { createPeople, isLoading } = useCreatePeople();
	const handleOnChange = (event) => {
		const { name, value } = getEventNameValue(event);
		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}))
		if(error){
			setError('')
		}
	}
	const handleOnSubmit = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, formData.email, formData.password)
			.then(userCredential => {
				console.log({ userCredential });
				const { uid } = userCredential.user;
				const { email, name } = formData;
				createPeople({
					email,
					name,
					userUid: uid,
				})
			})
			.catch(error => {
				console.log({ error })
				setError(error?.code)
			});
	};

	return (
		<form onSubmit={handleOnSubmit}>
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<h3 className="text-2xl font-bold">
						Sign Up
					</h3>
					<CardDescription className="font-medium">
						Enter your information to create an account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						{error &&
							<div className='w-full border p-2 rounded bg-orange-50 border-orange-300 text-orange-500'>
								{error}
							</div>
						}
						<InputText
							label="Full Name"
							placeholder="Enter full name"
							name="name"
							value={formData.name}
							onChange={handleOnChange}
							required
						/>
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
								Create an account
							</span>
						</Button>
					</div>
					<div className="mt-4 text-center text-sm font-medium text-slate-600">
						Already have an account?{" "}
						<button
							onClick={switchToLogin}
							className='text-slate-900 cursor-pointer hover:underline'
						>
							Sign in
						</button>
					</div>
				</CardContent>
			</Card>
		</form >
	);
}

export default Signup