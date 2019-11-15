CREATE PROCEDURE [dbo].[GetStats]
AS
	SELECT TOP 1 
		[UpdatedDate] 
	FROM 
		[Songs] 
	ORDER BY 
		[UpdatedDate] 

	SELECT 
		Count([SongId]) 
	FROM 
		[Songs]

RETURN 0
