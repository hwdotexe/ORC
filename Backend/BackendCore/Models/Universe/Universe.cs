using System;
using System.Collections.Generic;

namespace BackendCore.Models.Universe
{
	public class Universe
	{
		// TODO: idea - use a DB Translator class to store properties in other tables?
		// Translate them back into a model upon load?
		public string Name { get; set; }
		public object Worlds { get; set; }
		public object Cosmology { get; set; }
		public object Creation { get; set; }
		public object Timeline { get; set; }
		public List<Document> Notes { get; set; }
	}
}