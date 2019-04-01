IF NOT EXISTS(SELECT 1 FROM [Colors])
BEGIN
	INSERT INTO [Colors]
		([Label], [Color])
	VALUES
	( 'red', '#a4262c' ), 
	( 'orange', '#ca5010' ),
	( 'orangeYellow', '#986f0b' ),
	( 'yellowGreen', '#8cbd18' ),
	( 'green', '#0b6a0b' ),
	( 'cyan', '#038387' ),
	( 'cyanBlue', '#004e8c' ),
	( 'magenta', '#881798' ),
	( 'magentaPink', '#9b0062' ),
    ( 'black', '#000000' ),
    ( 'gray', '#7a7574' ),
	( 'gray20', '#69797e' )
END