<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LocationStoreRequest extends FormRequest
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
            'city_id'    => 'required|integer|exists:App\Models\City,id',
            'state_id'   => 'required|integer|exists:App\Models\State,id',
            'project_id' => 'required|integer|exists:App\Models\Project,id',
            'status_id'  => 'required|integer|exists:App\Models\Standardstatus,id',
        ];
    }
}
