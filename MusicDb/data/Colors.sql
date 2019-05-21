IF NOT EXISTS(SELECT 1 FROM [Colors])
BEGIN
	INSERT INTO [Colors]
		([Label], [Color])
	VALUES
		( 'Red', '#D32F2F'), 
		('Red Pigment', '#EA2027'), 
		('Pink', '#C2185B'),
		('Prunus Avium', '#e84393'),
		('Lavener Tea', '#D980FA'),
		('Shy Moment', '#a29bfe'),
		('Exodus Fruit', '#6c5ce7'),
		('Purple', '#7B1FA2'),	
		('Very Berry','#B53471'),
		('Magenta Purple','#6F1E51'),
		('Deep Purple','#512DA8'),
		('Indigo','#3949AB'),
		('2000 Leagues Under the sea','#1B1464'),
		('Mediterranean Sea','#1289A7'),
		('Electron BLue','#0984e3'),
		('Light Blue','#0288D1'),
		('Cyan','#0097A7'),
		('Mint Leaf','#00b894'),
		('Turkish Aqua','#006266'),
		('Teal','#00796B'),
		('Green','#43A047'),
		('Light Green','#689F38'),
		('Lime','#AFB42B'),
		('Bright Yarrow','#fdcb6e'),
		('Yellow','#FBC02D'),
		('Amber','#FFA000'),
		('Orange','#FB8C00'),
		('Orangeville','#e17055'),
		('Deep Orange','#E64A19'),
		('Brown','#5D4037'),
		('Grey','#616161'),
		('Blue Grey','#455A64'),
		('Black', '#000000')
END