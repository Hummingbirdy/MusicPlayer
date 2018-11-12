CREATE PROCEDURE [dbo].[UploadSongs]
	@songs [dbo].[SongsImportType] readonly
AS
	BEGIN
		BEGIN TRY
			BEGIN TRANSACTION
				MERGE INTO [dbo].[Songs] TARGET
					USING  @songs AS SOURCE 
					ON
						TARGET.[YouTubeId] = SOURCE.[YouTubeId]
						AND TARGET.[UserId] = SOURCE.[UserId]

				WHEN MATCHED THEN
					UPDATE
						SET 
							[UserId] = SOURCE.[UserId],
							[Name] = SOURCE.[Name],
							[Type] = 1,
							[Thumbnail] = SOURCE.[Thumbnail],
							[PublishedDate] = SOURCE.[PublishedDate],
							[UpdatedDate] = getdate()

				WHEN NOT MATCHED THEN
					INSERT (
						[UserId],
						[YouTubeId],
						[Name],
						[Type],
						[Thumbnail],
						[PublishedDate],
						[CreatedDate],
						[UpdatedDate]
					)
					VALUES (
						SOURCE.[UserId],
						SOURCE.[YouTubeId],
						SOURCE.[Name],
						1,
						SOURCE.[Thumbnail],
						SOURCE.[PublishedDate],
						getdate(),
						getdate()
					)
				WHEN NOT MATCHED BY SOURCE THEN DELETE;

			COMMIT TRANSACTION;
		END TRY
		BEGIN CATCH
			THROW;
		END CATCH;
	END;

RETURN 0;
