CREATE PROCEDURE [dbo].[DeleteTagReference]
	@referenceId INT
AS
	DELETE FROM [TagReferences] WHERE [TagReferenceId] = @referenceId
RETURN 0
