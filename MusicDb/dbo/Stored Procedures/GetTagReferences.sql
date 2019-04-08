CREATE PROCEDURE [dbo].[GetTagReferences]
	@userId varchar(50)
AS
	SELECT 
		r.[TagReferenceId],
		r.[TagId], 
		r.[YouTubeId],
		r.[Fixed],
		t.Tag,
		t.Color
	FROM
		[TagReferences] r
	JOIN
		[Tags] t on t.TagId = r.TagId
	WHERE
		r.UserId = @userId
RETURN 0
