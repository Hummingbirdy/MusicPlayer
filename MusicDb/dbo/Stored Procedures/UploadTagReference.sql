CREATE PROCEDURE [dbo].[UploadTagReference]
	@userId VARCHAR(50),
	@tagId INT,
	@youTubeId NVARCHAR(200)
AS
	BEGIN
		BEGIN TRY
			BEGIN TRANSACTION
				INSERT INTO [dbo].[TagReferences] ([UserId], [TagId], [YouTubeId], [Fixed])
				VALUES (@userId, @tagId, @youTubeId, 0)

			COMMIT TRANSACTION;
		END TRY
		BEGIN CATCH
			THROW;
		END CATCH;
	END
RETURN 0
