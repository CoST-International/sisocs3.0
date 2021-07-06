<?php

namespace App\Http\Controllers;

use App\Http\Requests\DocumentStoreRequest;
use App\Http\Resources\DocumentCollection;
use App\Models\Document;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Validator;

use function PHPUnit\Framework\throwException;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $documents = Document::when(request('q') && request('q') == 'all', function($query) {
            return $query->orderBy('id', 'asc');
        })->when(request('project'), function($query) {
            return $query->where('object_id', request('project'));
        })
        ->when(request('section'), function($query) {
            return $query->where('sections_id', request('section'));
        })->get();

        return new DocumentCollection($documents);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DocumentStoreRequest $request)
    {
        if ($request->hasFile('document_file')) {

            $documentFile = $request->file('document_file');
            $documentFilePath = $documentFile->move('attachments/documents/', time() . '-' . pathinfo($documentFile->getClientOriginalName(), PATHINFO_FILENAME) . '.' . $documentFile->getClientOriginalExtension());

            Document::create([
                'sections_id'           => $request->section_id,
                'object_id'             => $request->project_id,
                'document_types_id'     => $request->document_type_id,
                'document_path'         => $documentFilePath,
                'document_title'        => pathinfo($documentFile->getClientOriginalName(), PATHINFO_FILENAME), // $request->document_title,
                'document_author'       => $request->document_author,
                'document_language'     => $request->document_language,
                'document_published'    => Carbon::now()->toDateTimeString(), // $request->document_published,
                'document_description'  => $request->document_description,
                'document_start'        => $request->document_start,
                'document_end'          => $request->document_end,
                'document_format'       => $documentFile->getClientOriginalExtension(),
                'format'                => $documentFile->getClientOriginalExtension(),
                'language'              => now(),
            ]);
        }

        return response()->json('Success', 200);


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Document  $document
     * @return \Illuminate\Http\Response
     */
    public function destroy(Document $document)
    {
        $document->delete();
        return response(null, 204);
    }
}
