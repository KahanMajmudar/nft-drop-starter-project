import React, { useEffect, useState } from 'react'
import './App.css'
import twitterLogo from './assets/twitter-logo.svg'
import CandyMachine from './CandyMachine'

// Constants
const TWITTER_HANDLE = '_buildspace'
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`

const App = () => {
	const [walletAddress, setWalletAddress] = useState(null)

	const checkIfWalletIsConnected = async () => {
		try {
			const { solana } = window
			if (solana) {
				if (solana.isPhantom) {
					console.log('Phantom Wallet Found!!')

					const result = await solana.connect({ onlyIfTrusted: true })
					console.log(
						`Connected with public key: ${result.publicKey.toString()}`
					)

					setWalletAddress(result.publicKey.toString())
				}
			} else {
				alert('Solana object not found! Get a Phantom Wallet 👻')
			}
		} catch (error) {
			console.log({ error })
		}
	}

	const connectWallet = async () => {
		const { solana } = window
		if (solana) {
			const result = await solana.connect()
			console.log(
				`Connected with public key: ${result.publicKey.toString()}`
			)

			setWalletAddress(result.publicKey.toString())
		}
	}

	const renderNotConnectedContainer = () => (
		<button
			className="cta-button connect-wallet-button"
			onClick={connectWallet}
		>
			Connect to Wallet
		</button>
	)

	useEffect(() => {
		const onLoad = async () => {
			await checkIfWalletIsConnected()
		}
		window.addEventListener('load', onLoad)
		return () => window.removeEventListener('load', onLoad)
	}, [])

	return (
		<div className="App">
			<div className="container">
				<div className="header-container">
					<p className="header">🍭 Candy Drop</p>
					<p className="sub-text">NFT drop machine with fair mint</p>
					{!walletAddress && renderNotConnectedContainer()}
				</div>
				{walletAddress && (
					<CandyMachine walletAddress={window.solana} />
				)}
				<div className="footer-container">
					<img
						alt="Twitter Logo"
						className="twitter-logo"
						src={twitterLogo}
					/>
					<a
						className="footer-text"
						href={TWITTER_LINK}
						target="_blank"
						rel="noreferrer"
					>{`built on @${TWITTER_HANDLE}`}</a>
				</div>
			</div>
		</div>
	)
}

export default App

// candy-machine-address: Fr4UcdYY2p5mQa23kGZFTefDsa4CFgTNLqaNz9vw9fHp
// candy-machine-finished: 4HSiTEhAky95jsCL11ib3R73CJTck5XjjLn18V4JDQZ2rbzz4qRTfuqoFG1nVDnhVg7QAtjvopmmCubZt3ddKC53
