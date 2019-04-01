CREATE PROCEDURE [dbo].[GetColors]
AS
	SELECT	
		[Id], 
		[Label], 
		[Color]
	FROM
		[Colors]

RETURN 0
