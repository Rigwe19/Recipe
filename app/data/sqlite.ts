import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";

async function openDatabase(
  pathToDatabaseFile: string
): Promise<SQLite.SQLiteDatabase> {
  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "SQLite"
    );
  }
  const asset = await Asset.fromModule(
    require(pathToDatabaseFile)
  ).downloadAsync();
  await FileSystem.copyAsync({
    from: asset.localUri!,
    to: FileSystem.documentDirectory + "SQLite/recipedb.db",
  });
  console.log("first");
  return SQLite.openDatabase("myDatabaseName.db");
}
export default openDatabase;
