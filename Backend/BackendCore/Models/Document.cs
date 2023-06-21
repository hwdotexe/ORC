using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Models
{
	public class Document
	{
        [BsonId]
        public Guid DocumentID { get; set; }
		public List<DocumentField> Fields { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }

		// Sections?
		// Layout?

		public Document()
		{
		}
	}
}

