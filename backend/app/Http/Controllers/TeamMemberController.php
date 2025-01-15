<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class TeamMemberController extends Controller
{
    public function index() 
    { 
        $members = TeamMember::paginate(10); // Paginate 10 items per page return response()->json($members);
        return response()->json($members, 200); 
    }

    public function store(Request $request)
    {
        return $response = $request->all();
        exit;
        $data = $request->validate([
            'contingent_id' => 'required|exists:contingents,id',
            'name' => 'required|string',
            'birth_place' => 'required|string',
            'birth_date' => 'required|date',
            'gender' => 'required|string',
            'body_weight' => 'nullable|numeric',
            'body_height' => 'nullable|numeric',
            'blood_type' => 'nullable|string',
            'nik' => 'required|string',
            'family_card_number' => 'required|string',
            'province_id' => 'required|exists:provinces,id',
            'district_id' => 'required|exists:districts,id',
            'subdistrict_id' => 'required|exists:subdistricts,id',
            'ward_id' => 'required|exists:wards,id',
            'address' => 'required|string',
            'category' => 'required|in:Tanding,Seni,Olahraga',
            'files.family_card_document' => 'nullable|file',
            'files.id_card_document' => 'nullable|file',
            'files.certificate_of_health' => 'nullable|file',
            'files.recomendation_letter' => 'nullable|file',
            'files.parental_permission_letter' => 'nullable|file',
        ]);

        // Handle file uploads
        $fileFields = [
            'family_card_document',
            'id_card_document',
            'certificate_of_health',
            'recomendation_letter',
            'parental_permission_letter',
        ];

        foreach ($fileFields as $fileField) {
            if ($request->hasFile("files.$fileField")) {
                $data[$fileField] = $request->file("files.$fileField")->store('documents');
            }
        }

        // Create team member
        $teamMember = TeamMember::create($data);

        return response()->json($teamMember, 201);
    }


    public function show($id)
    {
        return TeamMember::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        // Validate the request data
        $data = $request->validate([
            'contingent_id' => 'required|exists:contingents,id',
            'name' => 'required|string',
            'birth_place' => 'required|string',
            'birth_date' => 'required|date',
            'gender' => 'required|in:M,F',
            'body_weight' => 'nullable|numeric',
            'body_height' => 'nullable|numeric',
            'nik' => 'required|string|max:16',
            'family_card_number' => 'required|string|max:16',
            'province_id' => 'required|exists:provinces,id',
            'district_id' => 'required|exists:districts,id',
            'subdistrict_id' => 'required|exists:subdistricts,id',
            'ward_id' => 'required|exists:wards,id',
            'address' => 'required|string',
            'category' => 'required|in:Tanding,Seni',
            'id_card_document' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
            'family_card_document' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
            'certificate_of_health' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
            'recomendation_letter' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
            'parental_permission_letter' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
        ]);
    
        // Find the existing member
        $member = TeamMember::findOrFail($id);
    
        // Update base attributes
        $member->update([
            'contingent_id' => $data['contingent_id'],
            'name' => $data['name'],
            'birth_place' => $data['birth_place'],
            'birth_date' => $data['birth_date'],
            'gender' => $data['gender'],
            'body_weight' => $data['body_weight'],
            'body_height' => $data['body_height'],
            'nik' => $data['nik'],
            'family_card_number' => $data['family_card_number'],
            'province_id' => $data['province_id'],
            'district_id' => $data['district_id'],
            'subdistrict_id' => $data['subdistrict_id'],
            'ward_id' => $data['ward_id'],
            'address' => $data['address'],
            'category' => $data['category'],
        ]); 
        
    
        // Handle file uploads
        $files = [
            'id_card_document',
            'family_card_document',
            'certificate_of_health',
            'recomendation_letter',
            'parental_permission_letter',
        ];

        foreach ($files as $file) {
            if ($request->hasFile($file)) {
                $path = $request->file($file)->store('documents', 'public');
                $member->$file = $path;
            }
        }
    
        // Return success response
        return response()->json([
            'message' => 'Member updated successfully!',
            'data' => $member,
        ], 200);
    }
    


    public function destroy($id)
    {
        $teamMember = TeamMember::findOrFail($id);
        foreach (['family_card_document', 'id_card_document', 'certificate_of_health', 'recomendation_letter', 'parental_permission_letter'] as $fileField) {
            if ($teamMember->$fileField) {
                Storage::delete($teamMember->$fileField);
            }
        }
        $teamMember->delete();

        return response()->json(['message' => 'Deleted successfully'], 200);
    }
}
