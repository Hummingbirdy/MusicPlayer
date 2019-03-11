CREATE PROCEDURE [dbo].[GetTagReferences]
AS
	SELECT 
		r.[TagId], 
		r.[YouTubeId],
		r.[Fixed],
		t.Tag
	FROM
		[TagReferences] r
	JOIN
		[Tags] t on t.TagId = r.TagId
RETURN 0
