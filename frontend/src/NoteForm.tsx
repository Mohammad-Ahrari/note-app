import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import type { NoteData, Tag } from "./App";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};

const NoteForm = ({ onSubmit }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: [],
    });
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Title + Tags */}
      <div className="grid grid-cols-2 gap-4">
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={titleRef}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-col">
          <label htmlFor="tags" className="text-sm font-medium mb-1">
            Tags
          </label>
          <CreatableSelect
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            isMulti
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col">
        <label htmlFor="content" className="text-sm font-medium mb-1">
          Body
        </label>
        <textarea
          id="content"
          required
          rows={15}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={markdownRef}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Save
        </button>
        <Link to="..  ">
          <button
            type="button"
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
};

export default NoteForm;
