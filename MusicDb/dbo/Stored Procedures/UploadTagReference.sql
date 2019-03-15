CREATE PROCEDURE [dbo].[UploadTagReference]
	@tagId INT,
	@youTubeId NVARCHAR(200)
AS
	BEGIN
		BEGIN TRY
			BEGIN TRANSACTION
				INSERT INTO [dbo].[TagReferences] ([TagId], [YouTubeId], [Fixed])
				VALUES (@tagId, @youTubeId, 0)

			COMMIT TRANSACTION;
		END TRY
		BEGIN CATCH
			THROW;
		END CATCH;
	END
RETURN 0
