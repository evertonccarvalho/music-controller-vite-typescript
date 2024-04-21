export function formatTime(seconds: number): string {
	// Calculate minutes and remaining seconds
	const minutes: number = Math.floor(seconds / 60);
	const remainingSeconds: number = Math.floor(seconds % 60);

	// Format minutes and seconds with leading zeros
	const formatMinutes: string = String(minutes).padStart(2, '0');
	const formatSeconds: string = String(remainingSeconds).padStart(2, '0');

	// Concatenate formatted minutes and seconds with a colon
	return `${formatMinutes}:${formatSeconds}`;
}
