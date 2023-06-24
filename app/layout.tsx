import './globals.scss';

import Providers from '@/components/Providers/Providers';
import { ThemeProvider } from '@/components/Providers/theme-provider';

import Navbar from '@/components/AppBar';
import AppBar from '@/components/AppBar';
import Header from '@/components/Header';

export const metadata = {
	title: 'FSC',
	description: 'Your financial assistant.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className='!min-h-full !h-full dark'>
			<Providers>
				<body className='!min-h-full relative bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800'>

					<div className="area z-10 opacity-50">
						<ul className="circles">
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
						</ul>
					</div >

					<div className='relative z-20'>
						<ThemeProvider attribute="class" defaultTheme="dark">
							<Header />
							<AppBar />
							<main className='pt-8 pb-32'>
								{children}
							</main>
						</ThemeProvider>
					</div>
				</body>
			</Providers>
		</html>
	)
}
