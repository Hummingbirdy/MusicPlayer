CREATE PROCEDURE [dbo].[BulkUploadTagReferences]
	@references [dbo].[TagRefenceImportType]  readonly
AS
	BEGIN
		BEGIN TRY
			BEGIN TRANSACTION
				MERGE INTO [dbo].[TagReferences] TARGET
					USING @references AS SOURCE
					ON
						TARGET.[TagId] = SOURCE.[TagId]
						AND TARGET.[YouTubeId] = SOURCE.[YouTubeId]

				WHEN NOT MATCHED THEN
					INSERT (
						[TagId],
						[YouTubeId],
						[Fixed]
					)
					VALUES (
						SOURCE.[TagId],
						SOURCE.[YouTubeId],
						1
					)
				WHEN NOT MATCHED BY SOURCE THEN DELETE;

			COMMIT TRANSACTION;
		END TRY
		BEGIN CATCH
			THROW;
		END CATCH;
	END;

RETURN 0
