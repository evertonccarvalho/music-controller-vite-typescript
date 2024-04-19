const ImportFiles = () => {
	const handleFileInputChange = (event) => {
		const selectFiles = Array.from(event.target.files);
		selectFiles.forEach((file) => {
			const reader = new FileReader();
			reader.onload = () => {
				const fileData = render.result;
				const fileObjet = {
					name: file.name,
					data: new Uint8Array(fileData),
				};

				window.electronAPI.SendToElectron('music-upload', fileObjet);
			};
			reader.readAsArrayBuffer(file);
		});
	};
	return (
		<div className="mb-3">
			<label
				className="block text-lg font-medium text-gray-400 mb-1"
				htmlFor="formFileMultiple"
			>
				Importar Musicas
			</label>
			<input
				className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid  bg-clip-padding px-3 py-[0.32rem] text-base font-normal file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit  file:py-[0.32rem] file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none border-neutral-600 text-neutral-200 file:bg-neutral-700 file:text-neutral-100 focus:border-primary"
				type="file"
				id="formFileMultiple"
				multiple
				accept=".mp3,.wav"
				onChange={handleFileInputChange}
			/>
		</div>
	);
};

export default ImportFiles;