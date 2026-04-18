'use client';

import { useState } from 'react';
import { AlertTriangle, KeyRound, Loader2, LogOut, Plus, Save, Undo2, X } from 'lucide-react';

import type { ProfileData, ResearchFocusIcon, SocialIcon } from '@/data/profile';

interface AdminDrawerProps {
  open: boolean;
  draftProfile: ProfileData;
  runtimeEditingEnabled: boolean;
  passwordChangeSupported: boolean;
  busy: boolean;
  feedback?: string;
  onClose: () => void;
  onDraftChange: (profile: ProfileData) => void;
  onSave: () => Promise<void>;
  onReset: () => void;
  onLogout: () => Promise<void>;
  onChangePassword: (payload: { oldPassword: string; newPassword: string; confirmPassword: string }) => Promise<string>;
}

const inputClassName =
  'focus-ring w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500';

const textareaClassName = `${inputClassName} min-h-[110px] resize-y`;

const researchIcons: ResearchFocusIcon[] = ['scan-search', 'shield-check', 'radar', 'messages-square', 'activity', 'sparkles'];
const socialIcons: SocialIcon[] = ['linkedin', 'mail', 'scholar', 'phone'];

export function AdminDrawer({
  open,
  draftProfile,
  runtimeEditingEnabled,
  passwordChangeSupported,
  busy,
  feedback,
  onClose,
  onDraftChange,
  onSave,
  onReset,
  onLogout,
  onChangePassword,
}: AdminDrawerProps) {
  const [passwordFeedback, setPasswordFeedback] = useState<string | undefined>();
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

  if (!open) {
    return null;
  }

  const updateDraft = (mutator: (draft: ProfileData) => void) => {
    const nextProfile = structuredClone(draftProfile);
    mutator(nextProfile);
    onDraftChange(nextProfile);
  };

  const addResearchCard = () => {
    updateDraft((draft) => {
      draft.researchFocus.push({
        title: 'New research focus',
        description: 'Describe the focus area.',
        icon: 'scan-search',
      });
    });
  };

  const addPublication = () => {
    updateDraft((draft) => {
      draft.publications.push({
        title: 'New publication',
        journal: 'Journal name',
        year: String(new Date().getFullYear()),
        highlight: 'Add a short highlight.',
        doiUrl: 'https://doi.org/placeholder',
        categoryTags: ['Research'],
      });
    });
  };

  const addProject = () => {
    updateDraft((draft) => {
      draft.projects.push({
        title: 'New project',
        description: 'Project overview.',
        challenge: 'Describe the challenge.',
        approach: 'Describe the approach.',
        impact: 'Describe the impact.',
        technologies: ['Python'],
      });
    });
  };

  const addAchievement = () => {
    updateDraft((draft) => {
      draft.achievements.push({
        title: 'New achievement',
        detail: 'Describe the milestone.',
        year: String(new Date().getFullYear()),
      });
    });
  };

  const handlePasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setChangingPassword(true);

    try {
      const message = await onChangePassword(passwordForm);
      setPasswordFeedback(message);
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-slate-950/70 backdrop-blur-sm">
      <div className="h-full w-full max-w-3xl border-l border-white/10 bg-[#040915]/95 shadow-[0_0_0_1px_rgba(122,162,255,0.08),-20px_0_80px_rgba(2,10,31,0.65)]">
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-6">
            <div>
              <p className="chip">Edit Portfolio</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Owner editing panel</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
                Every public section reads from the same profile object. Changes preview instantly here and can be saved when runtime persistence is available.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300"
              aria-label="Close admin drawer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="border-b border-white/10 px-5 py-4 sm:px-6">
            <div className="rounded-2xl border border-cyan/20 bg-cyan/10 px-4 py-4 text-sm leading-7 text-slate-200">
              {runtimeEditingEnabled ? (
                <p>Local runtime editing is enabled. Saving writes a development override file, which is useful while iterating before deployment.</p>
              ) : (
                <p>
                  Production mode is intentionally static-first. The UI is secure and session-based, but persistent live editing requires a storage upgrade such as Netlify Identity + CMS, Supabase, or a Git-backed workflow.
                </p>
              )}
            </div>
            {feedback ? <p className="mt-3 text-sm text-cyan">{feedback}</p> : null}
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
            <div className="space-y-8">
              <section className="space-y-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Hero & Identity</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-300">
                    Name
                    <input
                      className={inputClassName}
                      value={draftProfile.personalInfo.name}
                      onChange={(event) => updateDraft((draft) => {
                        draft.personalInfo.name = event.target.value;
                      })}
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-300">
                    Location
                    <input
                      className={inputClassName}
                      value={draftProfile.personalInfo.location}
                      onChange={(event) => updateDraft((draft) => {
                        draft.personalInfo.location = event.target.value;
                      })}
                    />
                  </label>
                </div>

                <label className="block space-y-2 text-sm text-slate-300">
                  Role line
                  <textarea
                    className={textareaClassName}
                    value={draftProfile.personalInfo.roleLine}
                    onChange={(event) => updateDraft((draft) => {
                      draft.personalInfo.roleLine = event.target.value;
                    })}
                  />
                </label>

                <label className="block space-y-2 text-sm text-slate-300">
                  Hero subtitle
                  <textarea
                    className={textareaClassName}
                    value={draftProfile.personalInfo.subtitle}
                    onChange={(event) => updateDraft((draft) => {
                      draft.personalInfo.subtitle = event.target.value;
                    })}
                  />
                </label>

                <label className="block space-y-2 text-sm text-slate-300">
                  Eyebrow
                  <input
                    className={inputClassName}
                    value={draftProfile.hero.eyebrow}
                    onChange={(event) => updateDraft((draft) => {
                      draft.hero.eyebrow = event.target.value;
                    })}
                  />
                </label>

                <label className="block space-y-2 text-sm text-slate-300">
                  Hero badges, comma separated
                  <textarea
                    className={textareaClassName}
                    value={draftProfile.hero.badges.join(', ')}
                    onChange={(event) => updateDraft((draft) => {
                      draft.hero.badges = event.target.value.split(',').map((item) => item.trim()).filter(Boolean);
                    })}
                  />
                </label>

                <label className="block space-y-2 text-sm text-slate-300">
                  Highlight cards, one per line
                  <textarea
                    className={textareaClassName}
                    value={draftProfile.hero.quickHighlights.join('\n')}
                    onChange={(event) => updateDraft((draft) => {
                      draft.hero.quickHighlights = event.target.value.split('\n').map((item) => item.trim()).filter(Boolean);
                    })}
                  />
                </label>
              </section>

              <section className="space-y-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">About & Thesis</h3>
                <label className="block space-y-2 text-sm text-slate-300">
                  About summary
                  <textarea
                    className={textareaClassName}
                    value={draftProfile.about.summary}
                    onChange={(event) => updateDraft((draft) => {
                      draft.about.summary = event.target.value;
                    })}
                  />
                </label>
                <label className="block space-y-2 text-sm text-slate-300">
                  Supporting text
                  <textarea
                    className={textareaClassName}
                    value={draftProfile.about.supportingText}
                    onChange={(event) => updateDraft((draft) => {
                      draft.about.supportingText = event.target.value;
                    })}
                  />
                </label>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-300">
                    Degree
                    <input
                      className={inputClassName}
                      value={draftProfile.about.statusCard.degree}
                      onChange={(event) => updateDraft((draft) => {
                        draft.about.statusCard.degree = event.target.value;
                      })}
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-300">
                    Status
                    <input
                      className={inputClassName}
                      value={draftProfile.about.statusCard.status}
                      onChange={(event) => updateDraft((draft) => {
                        draft.about.statusCard.status = event.target.value;
                      })}
                    />
                  </label>
                </div>
                <label className="block space-y-2 text-sm text-slate-300">
                  Institution
                  <input
                    className={inputClassName}
                    value={draftProfile.about.statusCard.institution}
                    onChange={(event) => updateDraft((draft) => {
                      draft.about.statusCard.institution = event.target.value;
                    })}
                  />
                </label>
                <label className="block space-y-2 text-sm text-slate-300">
                  Thesis title
                  <textarea
                    className={textareaClassName}
                    value={draftProfile.about.statusCard.thesisTitle}
                    onChange={(event) => updateDraft((draft) => {
                      draft.about.statusCard.thesisTitle = event.target.value;
                    })}
                  />
                </label>
              </section>

              <section className="space-y-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">Research Focus</h3>
                  <button type="button" onClick={addResearchCard} className="focus-ring inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-sm text-cyan">
                    <Plus className="h-4 w-4" />
                    Add card
                  </button>
                </div>
                <div className="space-y-4">
                  {draftProfile.researchFocus.map((item, index) => (
                    <div key={`${item.title}-${index}`} className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/45 p-4">
                      <div className="grid gap-4 md:grid-cols-[1fr_200px]">
                        <label className="space-y-2 text-sm text-slate-300">
                          Title
                          <input
                            className={inputClassName}
                            value={item.title}
                            onChange={(event) => updateDraft((draft) => {
                              draft.researchFocus[index].title = event.target.value;
                            })}
                          />
                        </label>
                        <label className="space-y-2 text-sm text-slate-300">
                          Icon
                          <select
                            className={inputClassName}
                            value={item.icon}
                            onChange={(event) => updateDraft((draft) => {
                              draft.researchFocus[index].icon = event.target.value as ResearchFocusIcon;
                            })}
                          >
                            {researchIcons.map((icon) => (
                              <option key={icon} value={icon}>
                                {icon}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <label className="block space-y-2 text-sm text-slate-300">
                        Description
                        <textarea
                          className={textareaClassName}
                          value={item.description}
                          onChange={(event) => updateDraft((draft) => {
                            draft.researchFocus[index].description = event.target.value;
                          })}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => updateDraft((draft) => {
                          draft.researchFocus.splice(index, 1);
                        })}
                        className="focus-ring rounded-full border border-rose-500/25 bg-rose-500/10 px-4 py-2 text-sm text-rose-200"
                      >
                        Remove card
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Skills</h3>
                <label className="block space-y-2 text-sm text-slate-300">
                  Languages & Tools, comma separated
                  <textarea
                    className={textareaClassName}
                    value={draftProfile.skills.languagesAndTools.join(', ')}
                    onChange={(event) => updateDraft((draft) => {
                      draft.skills.languagesAndTools = event.target.value.split(',').map((item) => item.trim()).filter(Boolean);
                    })}
                  />
                </label>
                <label className="block space-y-2 text-sm text-slate-300">
                  Methods, comma separated
                  <textarea
                    className={textareaClassName}
                    value={draftProfile.skills.methods.join(', ')}
                    onChange={(event) => updateDraft((draft) => {
                      draft.skills.methods = event.target.value.split(',').map((item) => item.trim()).filter(Boolean);
                    })}
                  />
                </label>
                <label className="block space-y-2 text-sm text-slate-300">
                  Theory, comma separated
                  <textarea
                    className={textareaClassName}
                    value={draftProfile.skills.theory.join(', ')}
                    onChange={(event) => updateDraft((draft) => {
                      draft.skills.theory = event.target.value.split(',').map((item) => item.trim()).filter(Boolean);
                    })}
                  />
                </label>
              </section>

              <section className="space-y-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">Publications</h3>
                  <button type="button" onClick={addPublication} className="focus-ring inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-sm text-cyan">
                    <Plus className="h-4 w-4" />
                    Add publication
                  </button>
                </div>
                <div className="space-y-4">
                  {draftProfile.publications.map((publication, index) => (
                    <div key={`${publication.title}-${index}`} className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/45 p-4">
                      <label className="block space-y-2 text-sm text-slate-300">
                        Title
                        <textarea
                          className={textareaClassName}
                          value={publication.title}
                          onChange={(event) => updateDraft((draft) => {
                            draft.publications[index].title = event.target.value;
                          })}
                        />
                      </label>
                      <div className="grid gap-4 md:grid-cols-3">
                        <label className="space-y-2 text-sm text-slate-300">
                          Journal
                          <input
                            className={inputClassName}
                            value={publication.journal}
                            onChange={(event) => updateDraft((draft) => {
                              draft.publications[index].journal = event.target.value;
                            })}
                          />
                        </label>
                        <label className="space-y-2 text-sm text-slate-300">
                          Year
                          <input
                            className={inputClassName}
                            value={publication.year}
                            onChange={(event) => updateDraft((draft) => {
                              draft.publications[index].year = event.target.value;
                            })}
                          />
                        </label>
                        <label className="space-y-2 text-sm text-slate-300">
                          Tag / Status
                          <input
                            className={inputClassName}
                            value={publication.tag || publication.status || ''}
                            onChange={(event) => updateDraft((draft) => {
                              draft.publications[index].tag = event.target.value;
                            })}
                          />
                        </label>
                      </div>
                      <label className="block space-y-2 text-sm text-slate-300">
                        Highlight
                        <textarea
                          className={textareaClassName}
                          value={publication.highlight}
                          onChange={(event) => updateDraft((draft) => {
                            draft.publications[index].highlight = event.target.value;
                          })}
                        />
                      </label>
                      <label className="block space-y-2 text-sm text-slate-300">
                        Category tags, comma separated
                        <textarea
                          className={textareaClassName}
                          value={publication.categoryTags.join(', ')}
                          onChange={(event) => updateDraft((draft) => {
                            draft.publications[index].categoryTags = event.target.value.split(',').map((item) => item.trim()).filter(Boolean);
                          })}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => updateDraft((draft) => {
                          draft.publications.splice(index, 1);
                        })}
                        className="focus-ring rounded-full border border-rose-500/25 bg-rose-500/10 px-4 py-2 text-sm text-rose-200"
                      >
                        Remove publication
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">Projects</h3>
                  <button type="button" onClick={addProject} className="focus-ring inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-sm text-cyan">
                    <Plus className="h-4 w-4" />
                    Add project
                  </button>
                </div>
                <div className="space-y-4">
                  {draftProfile.projects.map((project, index) => (
                    <div key={`${project.title}-${index}`} className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/45 p-4">
                      <label className="block space-y-2 text-sm text-slate-300">
                        Title
                        <input
                          className={inputClassName}
                          value={project.title}
                          onChange={(event) => updateDraft((draft) => {
                            draft.projects[index].title = event.target.value;
                          })}
                        />
                      </label>
                      <label className="block space-y-2 text-sm text-slate-300">
                        Description
                        <textarea
                          className={textareaClassName}
                          value={project.description}
                          onChange={(event) => updateDraft((draft) => {
                            draft.projects[index].description = event.target.value;
                          })}
                        />
                      </label>
                      <label className="block space-y-2 text-sm text-slate-300">
                        Challenge
                        <textarea
                          className={textareaClassName}
                          value={project.challenge}
                          onChange={(event) => updateDraft((draft) => {
                            draft.projects[index].challenge = event.target.value;
                          })}
                        />
                      </label>
                      <label className="block space-y-2 text-sm text-slate-300">
                        Approach
                        <textarea
                          className={textareaClassName}
                          value={project.approach}
                          onChange={(event) => updateDraft((draft) => {
                            draft.projects[index].approach = event.target.value;
                          })}
                        />
                      </label>
                      <label className="block space-y-2 text-sm text-slate-300">
                        Impact
                        <textarea
                          className={textareaClassName}
                          value={project.impact}
                          onChange={(event) => updateDraft((draft) => {
                            draft.projects[index].impact = event.target.value;
                          })}
                        />
                      </label>
                      <label className="block space-y-2 text-sm text-slate-300">
                        Technologies, comma separated
                        <textarea
                          className={textareaClassName}
                          value={project.technologies.join(', ')}
                          onChange={(event) => updateDraft((draft) => {
                            draft.projects[index].technologies = event.target.value.split(',').map((item) => item.trim()).filter(Boolean);
                          })}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => updateDraft((draft) => {
                          draft.projects.splice(index, 1);
                        })}
                        className="focus-ring rounded-full border border-rose-500/25 bg-rose-500/10 px-4 py-2 text-sm text-rose-200"
                      >
                        Remove project
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">Achievements</h3>
                  <button type="button" onClick={addAchievement} className="focus-ring inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-sm text-cyan">
                    <Plus className="h-4 w-4" />
                    Add achievement
                  </button>
                </div>
                <div className="space-y-4">
                  {draftProfile.achievements.map((achievement, index) => (
                    <div key={`${achievement.title}-${index}`} className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/45 p-4">
                      <div className="grid gap-4 md:grid-cols-[1fr_180px]">
                        <label className="space-y-2 text-sm text-slate-300">
                          Title
                          <input
                            className={inputClassName}
                            value={achievement.title}
                            onChange={(event) => updateDraft((draft) => {
                              draft.achievements[index].title = event.target.value;
                            })}
                          />
                        </label>
                        <label className="space-y-2 text-sm text-slate-300">
                          Year
                          <input
                            className={inputClassName}
                            value={achievement.year || ''}
                            onChange={(event) => updateDraft((draft) => {
                              draft.achievements[index].year = event.target.value;
                            })}
                          />
                        </label>
                      </div>
                      <label className="block space-y-2 text-sm text-slate-300">
                        Detail
                        <textarea
                          className={textareaClassName}
                          value={achievement.detail}
                          onChange={(event) => updateDraft((draft) => {
                            draft.achievements[index].detail = event.target.value;
                          })}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => updateDraft((draft) => {
                          draft.achievements.splice(index, 1);
                        })}
                        className="focus-ring rounded-full border border-rose-500/25 bg-rose-500/10 px-4 py-2 text-sm text-rose-200"
                      >
                        Remove achievement
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Postdoc Interests</h3>
                <label className="block space-y-2 text-sm text-slate-300">
                  Summary
                  <textarea
                    className={textareaClassName}
                    value={draftProfile.postdocInterests.summary}
                    onChange={(event) => updateDraft((draft) => {
                      draft.postdocInterests.summary = event.target.value;
                    })}
                  />
                </label>
                <label className="block space-y-2 text-sm text-slate-300">
                  Areas, one per line
                  <textarea
                    className={textareaClassName}
                    value={draftProfile.postdocInterests.areas.join('\n')}
                    onChange={(event) => updateDraft((draft) => {
                      draft.postdocInterests.areas = event.target.value.split('\n').map((item) => item.trim()).filter(Boolean);
                    })}
                  />
                </label>
              </section>

              <section className="space-y-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Contact & Links</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-300">
                    Email
                    <input
                      className={inputClassName}
                      value={draftProfile.contact.email}
                      onChange={(event) => updateDraft((draft) => {
                        draft.contact.email = event.target.value;
                      })}
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-300">
                    Phone
                    <input
                      className={inputClassName}
                      value={draftProfile.contact.phone}
                      onChange={(event) => updateDraft((draft) => {
                        draft.contact.phone = event.target.value;
                      })}
                    />
                  </label>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-300">
                    LinkedIn
                    <input
                      className={inputClassName}
                      value={draftProfile.contact.linkedin}
                      onChange={(event) => updateDraft((draft) => {
                        draft.contact.linkedin = event.target.value;
                      })}
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-300">
                    Scholar URL
                    <input
                      className={inputClassName}
                      value={draftProfile.contact.scholarUrl}
                      onChange={(event) => updateDraft((draft) => {
                        draft.contact.scholarUrl = event.target.value;
                      })}
                    />
                  </label>
                </div>
                <label className="block space-y-2 text-sm text-slate-300">
                  CV URL
                  <input
                    className={inputClassName}
                    value={draftProfile.personalInfo.cvUrl}
                    onChange={(event) => updateDraft((draft) => {
                      draft.personalInfo.cvUrl = event.target.value;
                    })}
                  />
                </label>

                <div className="space-y-4">
                  {draftProfile.socialLinks.map((link, index) => (
                    <div key={`${link.label}-${index}`} className="grid gap-4 rounded-3xl border border-white/10 bg-slate-950/45 p-4 md:grid-cols-[1fr_1fr_180px]">
                      <label className="space-y-2 text-sm text-slate-300">
                        Label
                        <input
                          className={inputClassName}
                          value={link.label}
                          onChange={(event) => updateDraft((draft) => {
                            draft.socialLinks[index].label = event.target.value;
                          })}
                        />
                      </label>
                      <label className="space-y-2 text-sm text-slate-300">
                        URL
                        <input
                          className={inputClassName}
                          value={link.href}
                          onChange={(event) => updateDraft((draft) => {
                            draft.socialLinks[index].href = event.target.value;
                          })}
                        />
                      </label>
                      <label className="space-y-2 text-sm text-slate-300">
                        Icon
                        <select
                          className={inputClassName}
                          value={link.icon}
                          onChange={(event) => updateDraft((draft) => {
                            draft.socialLinks[index].icon = event.target.value as SocialIcon;
                          })}
                        >
                          {socialIcons.map((icon) => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-white">
                  <KeyRound className="h-4 w-4 text-cyan" />
                  <h3 className="text-lg font-semibold">Change Password</h3>
                </div>
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm leading-7 text-amber-100">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-1 h-4 w-4 shrink-0" />
                    <p>
                      {passwordChangeSupported
                        ? 'In local development, changing the password writes a new server-side hash to data/admin-auth.json. In production, use environment variables or a proper identity provider.'
                        : 'Production passwords are environment-backed and intentionally immutable at runtime in this starter. Update ADMIN_PASSWORD_HASH in Netlify to rotate credentials.'}
                    </p>
                  </div>
                </div>

                <form className="space-y-4" onSubmit={handlePasswordChange}>
                  <div className="grid gap-4 md:grid-cols-3">
                    <label className="space-y-2 text-sm text-slate-300">
                      Old password
                      <input
                        type="password"
                        className={inputClassName}
                        value={passwordForm.oldPassword}
                        onChange={(event) => setPasswordForm((current) => ({ ...current, oldPassword: event.target.value }))}
                      />
                    </label>
                    <label className="space-y-2 text-sm text-slate-300">
                      New password
                      <input
                        type="password"
                        className={inputClassName}
                        value={passwordForm.newPassword}
                        onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))}
                      />
                    </label>
                    <label className="space-y-2 text-sm text-slate-300">
                      Confirm new password
                      <input
                        type="password"
                        className={inputClassName}
                        value={passwordForm.confirmPassword}
                        onChange={(event) => setPasswordForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                      />
                    </label>
                  </div>
                  {passwordFeedback ? <p className="text-sm text-cyan">{passwordFeedback}</p> : null}
                  <button
                    type="submit"
                    disabled={changingPassword}
                    className="focus-ring inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-5 py-3 text-sm font-semibold text-cyan disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {changingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                    Change Password
                  </button>
                </form>
              </section>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={onReset} className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200">
                <Undo2 className="h-4 w-4" />
                Reset Draft
              </button>
              <button type="button" onClick={onLogout} className="focus-ring inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-5 py-3 text-sm text-rose-200">
                <LogOut className="h-4 w-4" />
                Log Out
              </button>
            </div>
            <button
              type="button"
              onClick={() => void onSave()}
              disabled={busy}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-electric px-6 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}