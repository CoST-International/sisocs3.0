<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DocumentStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'document_file'     => 'required|file|mimes:pdf,doc,docx|max:2048',
            // 'project_id'        => 'required|integer|exists::App\Models\Project,id',
            'document_type_id' => 'required|integer|exists:App\Models\DocumentType,id',
        ];
    }
}
