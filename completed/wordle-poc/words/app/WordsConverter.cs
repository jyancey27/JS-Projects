//Read a Text File
using System;
using System.IO;
namespace readwriteapp
{
    class WordsConverter
    {
        [STAThread]
        static void Main(string[] args)
        {
            string inputFilePath = "C:\\Users\\Jaydon\\Documents\\Coding\\JavaScript\\JS-Projects\\completed\\wordle-poc\\words\\wordle-words.txt";
            string outputFilePath = "C:\\Users\\Jaydon\\Documents\\Coding\\JavaScript\\JS-Projects\\completed\\wordle-poc\\words\\wordleWords.js";

            List<string> words = new List<string>();
            using (StreamReader reader = new StreamReader(inputFilePath)) {
                string line;
                while ((line = reader.ReadLine()) != null) {
                    words.Add(line);
                }
            }

            using (StreamWriter writer = new StreamWriter(outputFilePath)) {
                writer.WriteLine("export const WORDLEWORDS = [");
                for (int i = 0; i < words.Count; i++)
                {
                    writer.WriteLine($"    '{words[i]}',");
                }
                writer.WriteLine("];");
            }


        }
    }
}