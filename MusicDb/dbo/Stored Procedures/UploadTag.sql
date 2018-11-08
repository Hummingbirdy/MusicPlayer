CREATE PROCEDURE [dbo].[UploadTag]
	@tag NVARCHAR(50)
AS
	BEGIN
		BEGIN TRY
			BEGIN TRANSACTION
				INSERT INTO [dbo].[Tags] ([Tag])
				VALUES (@tag)

				SELECT
					[TagId]
				FROM
					[dbo].[Tags]
				WHERE
					[Tag] = @tag

			COMMIT TRANSACTION;
		END TRY
		BEGIN CATCH
			THROW;
		END CATCH;
	END
RETURN 0
