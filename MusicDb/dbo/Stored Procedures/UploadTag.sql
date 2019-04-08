CREATE PROCEDURE [dbo].[UploadTag]
	@userId VARCHAR(50),
	@tag NVARCHAR(50),
	@type INT,
	@color NVARCHAR(20)
AS
	BEGIN
		BEGIN TRY
			BEGIN TRANSACTION
				INSERT INTO [dbo].[Tags] 
				(
					[UserId], 
					[Tag], 
					[TagType],
					[Color]
					)
				VALUES 
				(
					@userId, 
					@tag, 
					@type,
					@color
				)

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
