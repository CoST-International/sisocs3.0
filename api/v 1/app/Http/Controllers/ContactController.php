<?php

namespace App\Http\Controllers;

use App\Http\Resources\ContactCollection;
use App\Http\Resources\ContactsResource;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contact = Contact::query();

        if (request()->filled('q') && request()->q == 'all') {
            return new ContactCollection($contact->orderBy('type_name', 'asc')->get());
        } else {
            $contact = $contact->orderBy('id', 'asc')->paginate($this->pagination(request()->limit));
        }

        return new ContactCollection($contact);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Contact $contact)
    {
        $contact = Contact::create([
            'contact_name'  => request()->name,
            'email'         => request()->email,
            'address'       => request()->address,
            'phone'         => request()->phone
        ]);

        return new ContactsResource($contact);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Contact $contact)
    {
        return new ContactsResource($contact);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Contact $contact)
    {
        $contact->update([
            'contact_name'  => request()->name,
            'email'         => request()->email,
            'address'       => request()->address,
            'phone'         => request()->phone
        ]);

        return new ContactsResource($contact);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
        return response(null, 204);
    }
}
